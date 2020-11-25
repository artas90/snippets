(ns app.entry_point
    (:require app.basic)
)

(require 'app.macros)

(defn -main
    "This should be pretty simple."
    []
    (println "\n@@ Basic test @@")
    (app.basic/basic-test)
    (println "\n@@ Macros test @@")
    (app.macros/macros-test)
    (println "\nendmain.")
)
