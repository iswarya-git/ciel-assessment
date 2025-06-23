import logo from '../Images/logo.png'

const LeftPanel = () => {
    return <div className="flex flex-col h-[90vh] justify-between p-4">
        <div className="text-3xl md:text-4xl font-bold text-white mb-4">
            <img src={logo} className="w-40 md:w-72 h-auto" alt="Logo" />
        </div>

        <div className="mt-6 md:mt-10 md:p-8">
            <p className="text-3xl md:text-5xl font-semibold text-white">
                1000<sup className="text-xl align-super">+</sup> businesses joined
            </p>
            <p className="text-xl md:text-3xl font-semibold text-yellow-300 mt-2">Powering Growth with</p>
            <p className="text-3xl md:text-5xl font-semibold text-white mt-2">Lemonpay!</p>
        </div>
    </div>
}

export default LeftPanel