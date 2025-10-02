import React from "react";
import { Transition } from "@headlessui/react";
import { Button } from "@/Components/ui/button";

export default function Toast({
    message,
    type = "success",
    onClose = () => {},
}) {
    const bg = type === "success" ? "bg-green-600" : "bg-red-600";

    return (
        <Transition
            show={!!message}
            enter="transform transition duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transform transition duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
        >
            <div
                className={`fixed bottom-6 right-6 z-50 max-w-xs w-full ${bg} text-white rounded-lg shadow-lg`}
                role="status"
                aria-live="polite"
            >
                <div className="px-4 py-3 flex items-start gap-3">
                    <div className="flex-1 text-sm">{message}</div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-white"
                    >
                        ✕
                    </Button>
                </div>
            </div>
        </Transition>
    );
}
