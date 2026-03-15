# Second pass - only missing files, with 5-second delays

$images = @(
    @{ name = "pineapple";     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pineapple.jpg/220px-Pineapple.jpg" },
    @{ name = "watermelon";    url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/320px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg" },
    @{ name = "jackfruit";     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Jackfruit_hanging.JPG/200px-Jackfruit_hanging.JPG" },
    @{ name = "sapodilla";     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg/220px-%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg" },
    @{ name = "persimmon";     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Fuyu_persimmon_fruits%2C_one_cut_open.jpg/220px-Fuyu_persimmon_fruits%2C_one_cut_open.jpg" },
    @{ name = "starfruit";     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Averrhoa_carambola_ARS_k5735-7.jpg/220px-Averrhoa_carambola_ARS_k5735-7.jpg" },
    @{ name = "coconut";       url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg/220px-Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg" },
    @{ name = "quince";        url = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pancrace_Bessa00.jpg/220px-Pancrace_Bessa00.jpg" },
    @{ name = "mandarin";      url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Citrus_reticulata_April_2013_Nordbaden.JPG/220px-Citrus_reticulata_April_2013_Nordbaden.JPG" },
    @{ name = "nectarine";     url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Illustration_Prunus_persica_clean_no_descr.jpg/220px-Illustration_Prunus_persica_clean_no_descr.jpg" },
    @{ name = "peach";         url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Peach_Wikicommons.jpg/220px-Peach_Wikicommons.jpg" },
    @{ name = "cantaloupe";    url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Meloen_vrucht_met_bloem.jpg/220px-Meloen_vrucht_met_bloem.jpg" },
    @{ name = "cranberries";   url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cranberry_bog.jpg/220px-Cranberry_bog.jpg" }
)

$outputDir = "c:\Users\muthu\projects\healthy-foods\public\images\fruits"
$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    "Referer"    = "https://en.wikipedia.org/"
}

$ok = 0; $fail = 0

foreach ($img in $images) {
    $outFile = Join-Path $outputDir "$($img.name).jpg"
    if (Test-Path $outFile) {
        $sz = [math]::Round((Get-Item $outFile).Length/1KB, 1)
        Write-Host "SKIP $($img.name) (${sz}KB)"
        $ok++; continue
    }

    $tries = 4; $success = $false
    while ($tries -gt 0 -and -not $success) {
        try {
            Write-Host "GET  $($img.name)..." -NoNewline
            Invoke-WebRequest -Uri $img.url -OutFile $outFile -Headers $headers -TimeoutSec 45
            $sz = [math]::Round((Get-Item $outFile).Length/1KB, 1)
            Write-Host " OK (${sz}KB)"
            $success = $true; $ok++
        } catch {
            $tries--
            if ($tries -gt 0) { Write-Host " retry..."; Start-Sleep -Seconds 10 }
            else { Write-Warning " FAILED: $_"; $fail++ }
        }
    }
    Start-Sleep -Seconds 5
}

Write-Host "`n=== Done: $ok OK, $fail failed ===" -ForegroundColor Green
