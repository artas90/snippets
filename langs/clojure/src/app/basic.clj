(ns app.basic
    (:require clojure.set)
)

(defn basic-test
    []

    (println "Hello, World!")

    ;; Var

    (def x 12)

    (println "x =" x)

    (println "type x =" (type x))

    (println "type 'x =" (type 'x))

    (def y 15)
    (def z 120)

    (println "y + z =" (+ y z))

    ;; Calc
    (println "\n-- Calc --")

    (let [c 5 d 6]
        (println "с =" c)
        (println "d =" d)
        (println "c * d =" (* c d))
        (println "c / d =" (/ c d))
        (println "(float c) / d =" (/ (float c) d))
        (println "(mod c d)" (mod c d))
        (println "(Math/pow c d)" (Math/pow c d))
    )

    ;; String
    (println "\n-- String let --")

    (let [s1 "Hello" s2 "world"]
        (println (str s1 " + " s2 " + !"))
    )

    ;; Boolean
    (println "\n-- Boolean --")

    (println "true =>" (boolean true))
    (println "false =>" (boolean false))
    (println "nil =>" (boolean nil))
    (println "0 =>" (boolean 1))
    (println "1 =>" (boolean 1))
    (println "\"some string\" =>" (boolean "some string"))
    (println "\"\" =>" (boolean ""))

    ;; Func
    (println "\n-- Func --")

    (defn sum1
        "Sum 2 args"
        {:info "Some sum func"}
        [a b]
        (+ a b)
    )

    (def sum2 (fn
        [a b]
        (+ a b)
    ))

    (def sum3 #(+ %1 %2))

    (println "meta sum1 =" (meta sum1))

    (println "(sum1 3 (inc 4)) =" (sum1 3 (inc 4)))

    (println "(sum2 5 6) =" (sum2 5 6))

    (println "(sum2 7 8) =" (sum2 7 8))

    ;; Func ext
    (println "\n-- Func ext --")

    (defn multifn
        ([arg1]
            (str "one arg" arg1)
        )

        ([arg1 arg2]
            (str "two args" arg1 " and " arg2)
        )

        ([arg1 arg2 & restargs]
            (str "many args" arg1 " and " arg2 " then " restargs)
        )
    )

    (defn vectorunpack
        [[arg1 arg2 & vectorarg]]
        (str "vectorunpack args" arg1 " and " arg2 " then " vectorarg)
    )

    (println (multifn 1))
    (println (multifn 1 2))
    (println (multifn 1 2 3 4 5))
    (println (vectorunpack [1 2 3 4 5]))

    ;; Clojure
    (println "\n-- Clojure --")

    (defn make-appender
        [suffix]
        (fn [arg] (str arg suffix))
    )

    (let [bang (make-appender "!")]
        (println (bang "it works"))
    )

    ;; Control flow
    (println "\n-- Control flow --")

    (def c true)

    (if c
        (do
            (println "Action 1 (if true)")
            (println "Action 2 (if true)")
        )
        (println "Only one action (if false)")
    )

    (def c false)

    (if c
        (do
            (println "Action 1 (if true)")
            (println "Action 2 (if true)")
        )
        (println "Only one action (if false)")
    )

    (when c
        (println "Action 1 (when true)")
        (println "Action 2 (when true)")
    )

    ;; Control flow if-let
    (println "\n-- if-let --")

    (def r1 (if-let
        [x (> 15 12)]
        x
        nil
    ))

    (def r2 (if-let [x (< 15 12)]
        x
        nil
    ))

    (println "if-let r1, r2 =" r1 r2)

    ;; When-let
    (println "\n-- when-let --")

    (when-let [abc (+ 2 3)]
        abc
        (println "ab-")
        (println "-bc")
    )

    ;; Case

    (println "\n-- Case --")

    (defn test-case
        [x1]
        (case x1
            12 (do
                (println "print-12")
                (str "result is 12")
            )
            15 (do
                (println "print-15")
                (str "result is 15")
            )
            nil
        )
    )

    (println (test-case 12))
    (println (test-case 15))
    (println (test-case 33))

    ;; Cond test
    (println "\n-- Cond test --")

    (defn cond-test [x1]
        (cond
            (<= x1 5) "less then 5"
            (>= x1 10) "more then 10"
            :else "5 - 10"
        )
    )

    (println (cond-test 2))
    (println (cond-test 12))
    (println (cond-test 8))

    ;; Condp test
    (println "\n-- Condp test --")

    (defn condp-test1 [x1]
        (condp = x1
            1 "1st"
            2 "2nd"
            3 "3rd"
            (str x1 "th")
        )
    )

    (println (condp-test1 1))
    (println (condp-test1 2))
    (println (condp-test1 3))
    (println (condp-test1 4))

    ;; Data structures
    (println "\n-- Data strucures --")

    (println (type "hello"))
    (println (type :hello))

    (println (type (seq [1 2 3])))
    (println (seq [1 2 3]))

    (println (type '(1 2 3)))
    (println '(1 2 3))

    (println (type (seq '(1 2 3))))
    (println (seq '(1 2 3)))

    ;; Set
    (println "\n-- Set --")
    (println #{2 4 8 10})
    (println (type #{2 4 8 10}))
    (println (seq #{2 4 8 10}))
    (println (type (seq #{2 4 8 10})))
    (println (clojure.set/select odd? #{1 2 3 4 5 6 7 8 9 10 11 12}))
    (println (clojure.set/select (fn [x] (> x 5)) #{1 2 3 4 5 6 7 8 9 10 11 12}))

    ;; Map
    (println "\n-- Map --")
    (def map1 {"a-key" "a-val", "b" 1, :c 2})
    (println "map1=" map1)
    (println "b=" (get map1 "b"))
    (println "d=" (get map1 "d"))
    (println ":c=" (:c map1))
    (assoc map1 "e" "ee")
    (def map2 (assoc map1 "f" "ff"))
    (def map2 (assoc map1 "g" 12345))
    (println "map1=" map1)
    (println "map2=" map2)

    ;; Data structures operations
    (println "\n-- Data strucures operations --")
    (println (nth [1 3 5 7 9] 2))
    (println (nth '(1 3 5 7 9) 2))
    (println "conj, disj")
    (println (conj [1 3 5 7 9] 99))
    (println (conj '(1 3 5 7 9) 99))
    (println (disj #{1 3 5 7 9} 9))
    (println (disj #{1 3 5 7 9} 99))

    ;; My Tests
    (println "\n-- My Test --")

    (defn more-?-than-5? [x]
        (> x 5)
    )
    
    (println "more than 5 = " (more-?-than-5? 9))
)
