import { useState, useEffect } from "react";

function Password() {
    // --- State Hooks ---
    // State to store the length of the password (range: 6 to 20)
    const [length, setLength] = useState(6);
    // State to hold the current generated password string
    const [password, setPassword] = useState('');
    // State to track if numbers should be included in the password
    const [numbers, setNumbers] = useState(false);
    // State to track if special characters should be included in the password
    const [special, setSpecial] = useState(false);

    // --- Core Logic ---
    // Function to construct a random password based on active options
    const generatePassword = () => {
        // Start with lowercase and uppercase alphabets as base characters
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        // Append numbers if the numbers option is checked
        if (numbers) str += "0123456789";
        // Append symbols/special characters if the special option is checked
        if (special) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let generated = '';
        // Randomly pick characters from 'str' until the desired length is reached
        for (let i = 1; i <= length; i++) {
            generated += str.charAt(Math.floor(Math.random() * str.length));
        }
        // Update the password state with the newly created password
        setPassword(generated);
    }

    // Effect hook to automatically regenerate the password
    // whenever length, numbers checkbox, or special checkbox changes
    useEffect(() => {
        generatePassword();
    }, [length, numbers, special]);

    // Asynchronous function to write the password to the user's clipboard
    const copyPassword = async () => {
        try {
            await navigator.clipboard.writeText(password);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="w-112.5 bg-black rounded-lg px-4 py-8 bg-black/30 text-white">
            <h1 className="text-2xl font-bold text-center mb-6">Password Generator</h1>
            
            {/* Input field to display the generated password, and copy button */}
            <div className="p-4 rounded-lg flex items-center justify-between">
                <input 
                    type="text" 
                    placeholder="password" 
                    value={password} 
                    className='w-[290px] bg-gray-500 rounded-sm text-white px-2 py-1' 
                    readOnly 
                />
                <button 
                    onClick={copyPassword} 
                    className="ml-1 bg-gray-900 rounded-2xl h-[38px] px-4 py-1.5 cursor-pointer w-fit"
                >
                    &#x2398; Copy
                </button>
            </div>
            
            {/* Password customization controls: Length slider, Numbers check, and Special characters check */}
            <div className="flex flex-col items-center justify-between">
                {/* Password Length Control */}
                <div className="flex items-center justify-between gap-4 mb-2">
                    <input 
                        type="range" 
                        min={6} 
                        max={20} 
                        value={length} 
                        onChange={(e) => setLength(e.target.value)} 
                    />
                    <label htmlFor="length">Length: {length}</label>
                </div>
                
                {/* Numbers Inclusion Toggle */}
                <div className="flex items-center justify-between gap-4 mb-2">
                    <input 
                        type="checkbox" 
                        name="numbers" 
                        id="numbers" 
                        className="cursor-pointer w-4 h-4 bg-black" 
                        onChange={() => setNumbers((prev) => !prev)} 
                    />
                    <label htmlFor="numbers">Numbers</label>
                </div>
                
                {/* Special Characters Inclusion Toggle */}
                <div className="flex items-center justify-between gap-4 mb-2">
                    <input 
                        type="checkbox" 
                        name="special" 
                        id="special" 
                        className="cursor-pointer w-4 h-4 bg-black" 
                        onChange={() => setSpecial((prev) => !prev)} 
                    />
                    <label htmlFor="special">Special Characters</label>
                </div>
            </div>
        </div>
    );
}

export default Password;