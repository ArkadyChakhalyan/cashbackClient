export type TCashbackFormNameProps = {
    addLabel?: string;
    chips: string[];
    duplicateError?: string;
    isDisabled?: boolean;
    isFilter?: boolean;
    notFoundLabel?: string;
    value: string;
    onAdd?: (value: string) => void;
    onChange?: (prevValue: string, newValue: string) => Promise<any>;
    onDelete?: (value: string) => Promise<any>;
    onSelect: (value: string) => void;
};
