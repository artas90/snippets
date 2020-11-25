mkdir -p mods/com.greetings

javac -d mods/com.greetings `find src -name '*.java'`

mkdir -p mlib

jar --create \
    --file=mlib/com.greetings.jar \
    --main-class=com.greetings.Main \
    -C mods/com.greetings .

jlink --module-path $JAVA_HOME/jmods:mlib \
      --add-modules com.greetings \
      --output dist
