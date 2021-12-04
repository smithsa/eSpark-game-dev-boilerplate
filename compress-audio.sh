compress_audio () {
  cd $1
  mkdir temp
  find * -maxdepth 1 -type f -exec ffmpeg -y -i ./{} -map 0:a:0 -b:a 96k temp/{} \;
  find * -maxdepth 0 -type f -exec rm {} \;
  cp -a ./temp/. .
  rm -rf temp
  cd -
}

compress_audio "dist/sounds"
compress_audio "dist/music"
compress_audio "dist/voice"
