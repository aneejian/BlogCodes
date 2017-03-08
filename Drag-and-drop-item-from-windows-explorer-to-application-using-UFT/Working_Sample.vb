SystemUtil.Run("https://tineye.com")
Wait(5)
Set DragArea = Browser("openurl:=https://tineye.com").Page("url:=https://tineye.com").WebEdit("type:=text", "name:=url", "html tag:=INPUT", "index:=0")
DragItemFromWindowsExplorerToIe "C:\Users\Public\Pictures\Sample Pictures\Koala.jpg", DragArea
