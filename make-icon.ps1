Add-Type -AssemblyName System.Drawing
$b = New-Object System.Drawing.Bitmap(512, 512)
$g = [System.Drawing.Graphics]::FromImage($b)
$g.SmoothingMode = 'AntiAlias'
$g.Clear([System.Drawing.Color]::FromArgb(16, 185, 129))
$p = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(9, 9, 11), 44)
$p.StartCap = 'Round'
$p.EndCap = 'Round'
$p.LineJoin = 'Round'
$pts = [System.Drawing.Point[]]@(
  (New-Object System.Drawing.Point(96, 280)),
  (New-Object System.Drawing.Point(168, 280)),
  (New-Object System.Drawing.Point(208, 176)),
  (New-Object System.Drawing.Point(264, 352)),
  (New-Object System.Drawing.Point(312, 224)),
  (New-Object System.Drawing.Point(360, 280)),
  (New-Object System.Drawing.Point(424, 192))
)
$g.DrawLines($p, $pts)
$b.Save("$PWD\dailyfit-512.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "DONE! Saved dailyfit-512.png"
