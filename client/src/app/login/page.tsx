export default function login(){
    return(
        <div>
            <div className="flex justify-center align-middle">
                <form>
                    <div>
                        <span>Email</span>
                        <input className="bg-none border-solid border-red-600 border-4" type="email" id="email" />
                    </div>
                </form>
            </div>
        </div>
    )
}