import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

interface InstructionsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-40" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<DialogTitle as="h3" className="text-2xl font-bold leading-6 text-gray-900">
									Instructions
								</DialogTitle>
								<div className="mt-4 space-y-4 text-gray-600">
									<p>
										On the right, you can see a canvas and a side panel. Clicking the{" "}
										<span className="font-semibold text-indigo-600">initialize</span> button will
										create a bunch of turtles on the canvas. Each turtle has a set of colors on its
										shell, representing its beliefs and opinions.
									</p>
									<h3 className="text-xl font-bold">Steps</h3>
									<ol className="list-decimal list-inside space-y-1">
										<li>
											Click the <span className="font-semibold text-indigo-600">initialize</span>{" "}
											button to create turtles.
										</li>
										<li>
											Click the <span className="font-semibold text-indigo-600">run</span> button
											to start the simulation.
										</li>
									</ol>
									<p>
										Each turtle will randomly select a neighbor and compare their beliefs. If they
										have at least one belief in common, they interact, and one may adopt a new
										belief from the other.
									</p>
									<p>
										After many interactions, turtles become resistant to change as they become
										surrounded by others with similar beliefs, forming a "filter bubble". See what
										happens when you run the simulation!
									</p>
								</div>

								<div className="mt-6">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
										onClick={onClose}
									>
										Got it, thanks!
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
