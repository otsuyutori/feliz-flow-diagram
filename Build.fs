open Fake.Core
open Fake.IO
open Farmer
open Farmer.Builders

open Helpers

initializeContext()

let rootPath = Path.getFullName "./"
let sharedPath = Path.getFullName "src/Shared"
let serverPath = Path.getFullName "src/Server"
let clientPath = Path.getFullName "src/Client"
let staticPath = Path.getFullName "./wwwroot"
let devStaticPath = Path.getFullName "src/Client/public"
let fablePath = Path.getFullName ".fable"
let devFablePath = Path.getFullName "src/Client/.fable"
let deployPath = Path.getFullName "deploy"
let sharedTestsPath = Path.getFullName "tests/Shared"
let serverTestsPath = Path.getFullName "tests/Server"
let clientTestsPath = Path.getFullName "tests/Client"

Target.create "CleanProd" (fun _ ->
    Shell.cleanDir deployPath
    Shell.cleanDir staticPath
    Shell.copy deployPath [(rootPath + "/index.css")]
    run dotnet "fable clean --yes" fablePath // Delete *.fs.js files created by Fable
)

Target.create "CleanDev" (fun _ ->
    Shell.cleanDir devStaticPath
    Shell.copy devStaticPath [(clientPath + "/index.css")]
    run dotnet "fable clean --yes" devFablePath // Delete *.fs.js files created by Fable
)

Target.create "InstallModules" (fun _ -> run npm "install" ".")

Target.create "Build" (fun _ ->
    run dotnet $"publish -c Release -o \"{deployPath}\"" serverPath
    run dotnet $"fable {clientPath} -o .fable -s --noCache" rootPath
    run npm "run build" rootPath
)

Target.create "Serve" (fun _ ->
    run npm "run serve" rootPath
)

Target.create "Run" (fun _ ->
    run dotnet $"fable -o {devFablePath} -s --noCache" clientPath
    run npm "run build-dev" rootPath
    run dotnet "watch run" serverPath
)

Target.create "RunTests" (fun _ ->
    run dotnet "build" sharedTestsPath
    [ "server", dotnet "watch run" serverTestsPath
      "client", dotnet "fable watch -o output -s --run npm run test:live" clientTestsPath ]
    |> runParallel
)

Target.create "Format" (fun _ ->
    run dotnet "fantomas . -r" "src"
)

open Fake.Core.TargetOperators

let dependencies = [
    "CleanProd"
        ==> "InstallModules"
        ==> "Build"
        ==> "Serve"

    "CleanDev"
        ==> "InstallModules"
        ==> "Run"

    "InstallModules"
        ==> "RunTests"
]

[<EntryPoint>]
let main args = runOrDefault args