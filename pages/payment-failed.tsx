export const getStaticProps = async (context) => {
    return {
        props:{}
    }
}

function PaymentFailed() {
    return (
        <div className="min-h-screen mt-10 flex flex-col items-center justify-center">
        <>    
            <img className="h-40" src="/err.svg" alt="my image" />
            <div className="text-red text-xl mt-5 font-bold">
                Payment Failed
            </div>
            <div className="mt-10 mx-5">
                Unfortunately payment could not be confirmed by our payment provider. Please contact us on tickets@noddy.co.za if you have any questions.
            </div>              
        </>  
    </div>
    )
}

export default PaymentFailed