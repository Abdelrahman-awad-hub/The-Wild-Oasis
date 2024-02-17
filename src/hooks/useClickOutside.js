import { useEffect, useRef } from "react";

export function useClickOutside(handler, listenCapturing = true) {
    const ref = useRef();

    useEffect(
        function () {
            function handelClick(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler();
                }
            }
            document.addEventListener("click", handelClick, listenCapturing);

            return () => document.addEventListener("click", handelClick, listenCapturing);
        },
        [handler, listenCapturing]
    );

    return ref;
}
