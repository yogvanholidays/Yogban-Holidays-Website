import { Link } from "react-router-dom"

const Footer = () =>{
    return (
        <div className="bg-red-900 py-10 flex flex-col items-center">
            <div className="container mx-auto flex justify-between items-center flex-col 2xl:flex-row">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to='/'>YogbanHolidays.com</Link>
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4 mt-2 2xl:mt-0">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
            <span className="text-white text-sm tracking-tight flex gap-4 mt-4 -mb-8">
                    <p className="cursor-pointer">developed by Batloop</p>
                </span>
        </div>
    )
}

export default Footer