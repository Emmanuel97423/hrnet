export type ButtonProps = {
    text: string;
    color?: "primary" | "secondary" | "danger" | "success" | "warning" |"red";
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    link?: string;
    onClick?: () => void;

}