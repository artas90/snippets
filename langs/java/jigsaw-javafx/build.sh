mkdir -p mods/com.mycompany.helloworld
javac -d mods/com.mycompany.helloworld  `find src -name '*.java'`

mkdir -p jars
jar --create \
    --file=jars/com.mycompany.helloworld.jar \
    --main-class=com.mycompany.helloworld.HelloWorld \
    -C mods/com.mycompany.helloworld .

jlink --module-path $JAVA_HOME/jmods:jars \
      --add-modules com.mycompany.helloworld \
      --output dist
