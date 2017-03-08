Sub DragItemFromWindowsExplorerToIe(ByVal FilePath, ByVal DropAreaObject)
	'Creating file system object
	Set fso = CreateObject("Scripting.FileSystemObject")
	'Checking if file exist
	If fso.FileExists(FilePath) Then
		'Creating device replay object
		Set dr = CreateObject("Mercury.DeviceReplay")
		'Creating Windows forms control object
		Set ctlr = DotNetFactory.CreateInstance("System.Windows.Forms.Control")
		FolderPath = fso.GetParentFolderName(FilePath)
		FolderPathArray = Split(FolderPath, "\")
		FolderName = FolderPathArray(UBound(FolderPathArray))
		FileName = fso.GetFileName(FilePath)
		'Adding description for Internet Explorer Window
		Set IEWindowDesc = Description.Create
		IEWindowDesc("micclass").Value = "Window"
		IEWindowDesc("regexpwndtitle").Value = ".*Internet Explorer.*"
		IEWindowDesc("regexpwndclass").Value = "IEFrame"
		Set IEWindow = Window(IEWindowDesc)
		'Adding description for Folder Window
		Set ExplorerWindowDesc = Description.Create
		ExplorerWindowDesc("micclass").Value = "Window"
		ExplorerWindowDesc("regexpwndtitle").Value = FolderName
		ExplorerWindowDesc("text").Value = FolderName
		ExplorerWindowdesc("Location").Value = 0
		ExplorerWindowDesc("regexpwndclass").Value = "CabinetWClass"
		Set ExplorerWindow = Window(ExplorerWindowDesc)
		'Opening the folder path
		SystemUtil.Run FolderPath,"","","explore"
		'Resizing and moving the folder window
		ExplorerWindow.Resize 600,700
		ExplorerWindow.Move 0,0
		Set FileToDrag = ExplorerWindow.WinObject("nativeclass:=window", "acc_name:=Items View").WinList("nativeclass:=list", "acc_name:=Items View")
		FileToDrag.Select FileName
		FilePosX = ctlr.MousePosition.X
		FilePosY = ctlr.MousePosition.Y
		'Moving the browser window
		IEWindow.Restore
		IEWindow.Move 700, 0
		DropAreaObject.Object.scrollIntoView
		DropAreaX = DropAreaObject.GetROProperty("abs_x")
		DropAreaY = DropAreaObject.GetROProperty("abs_y")
		dr.DragAndDrop FilePosx, FilePosY, DropAreaX, DropAreaY, LEFT_MOUSE_BUTTON
		Set dr = Nothing
		Set ctlr = Nothing
	End If
	Set fso = Nothing
End Sub
