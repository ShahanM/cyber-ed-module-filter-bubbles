import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

export interface SelectOption {
	value: string;
	label: string;
}

interface CustomSelectProps {
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, disabled = false }) => {
	const [selected, setSelected] = useState<SelectOption>(
		() => options.find((opt) => opt.value === value) || options[0]
	);

	useEffect(() => {
		const newSelected = options.find((opt) => opt.value === value);
		if (newSelected) {
			setSelected(newSelected);
		}
	}, [value, options]);

	const handleChange = (selectedOption: SelectOption) => {
		setSelected(selectedOption);
		onChange(selectedOption.value);
	};

	return (
		<Listbox value={selected} onChange={handleChange} disabled={disabled}>
			<div className="relative">
				<ListboxButton
					className={clsx(
						"relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10",
						"text-left border border-gray-300 shadow-sm",
						"focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500",
						"sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
					)}
				>
					<span className="block truncate text-gray-800">{selected?.label}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<ChevronUpDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
					</span>
				</ListboxButton>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<ListboxOptions
						className={clsx(
							"absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md",
							"bg-white py-1 text-base shadow-lg",
							"ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						)}
					>
						{options.map((option, optionIdx) => (
							<ListboxOption
								key={optionIdx}
								className={clsx(
									"relative cursor-default select-none py-2 pl-10 pr-4",
									"hover:bg-amber-500 hover:text-gray-900 text-gray-900"
								)}
								value={option}
							>
								{({ selected }) => (
									<>
										<span
											className={clsx("block truncate", selected ? "font-medium" : "font-normal")}
										>
											{option.label}
										</span>
										{selected ? (
											<span
												className={clsx(
													"absolute inset-y-0 left-0 flex items-center pl-3",
													"text-amber-500"
												)}
											>
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</Transition>
			</div>
		</Listbox>
	);
};
