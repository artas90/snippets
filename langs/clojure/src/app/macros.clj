(ns app.macros
    (:require clojure.set)
)

(defn macros-test
    []

    ;; my-when
    (println "\n-- my-when --")

    (defmacro my-when-1 [condit & operations]
        (list 'if condit
            operations
        )
    )

    (defmacro my-when-2 [condit & operations]
        '('if condit
            operations
        )
    )

    (println (macroexpand '(my-when-1 (> 5 2)
        (println "my-when 1")
        (println "my-when 2")
        (println "my-when 3")
    )))

    (println (macroexpand '(my-when-2 (> 5 2)
        (println "my-when 1")
        (println "my-when 2")
        (println "my-when 3")
    )))

    (my-when-1 (> 5 2)
        (println "my-when 1")
        (println "my-when 2")
        (println "my-when 3")
    )

)
