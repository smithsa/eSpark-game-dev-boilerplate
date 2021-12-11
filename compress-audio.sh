#!/bin/bash

TEMP_DIR="./temp"
BITRATE_KB=96
function traverse_directory_and_ffmpeg_compress() {
  find * -maxdepth 0 -type f -exec ffmpeg -y -i ./{} -c:v libvpx-vp9 -b:v 0 -crf 35 -pass 2 -keyint_min 30 -g 30 "$TEMP_DIR"/{} \;
}

compress_audio () {
  input_directory="$1"
  cd "$input_directory"
  if [ ! -d "$TEMP_DIR" ]; then
    mkdir "$TEMP_DIR";
    traverse_directory_and_ffmpeg_compress
  else
    traverse_directory_and_ffmpeg_compress
  fi

  for path in "$input_directory"/*; do
      if file -b -- "$path" | grep -qi audio; then
          printf 'Found an audio file and will remove %s\n' "$path"
          rm file
          exit
     fi
  done

  cp -a ./temp/. .
  rm -rf temp
  cd -
  echo "Done compressing audio files"
}

compress_audio "dist/sounds"
compress_audio "dist/music"
compress_audio "dist/voice"
