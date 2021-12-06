compress_audio () {
  cd $1
  mkdir temp
  find * -maxdepth 1 -type f -exec ffmpeg -y -i ./{} -map 0:a:0 -b:a 96k temp/{} \;
  for path in "$1"/*; do
      if file -b -- "$path" | grep -qi audio; then
          printf 'Found an audio file and will remove %s\n' "$path"
          rm file
          exit
     fi
  done
  cp -a ./temp/. .
  rm -rf temp
  cd -
}

compress_audio "dist/sounds"
compress_audio "dist/music"
compress_audio "dist/voice"
