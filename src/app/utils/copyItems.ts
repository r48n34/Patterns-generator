import toast from "react-hot-toast";

export function toCopyBoard(str: string) {
    try {    
        const textarea = document.createElement("textarea");
        textarea.textContent = str;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
      
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        
        toast.success("Copied");
        return true
    }
    catch (error) {
        console.log(error);
        return false
    }
}