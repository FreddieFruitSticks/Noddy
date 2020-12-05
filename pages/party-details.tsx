export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }

function PartyDetails({posts}) {
    return (
        <div>
            <div className="m-5 font-semi mb-10 text-2xl underline">
                Noddy Party Summary
            </div>
            <div className="m-5">Please see below for information relevant to the Noddy Children's party</div>
            <div className="m-5 list-disc">
                <div className="flex flex-row"><li></li><span>!!!!You can bring your own food, but please note we will be selling boerie rolls as well!!!!</span></div>
                <div className="flex flex-row"><li></li><span>You don't need to print this email, your name will be on the register at the gate</span></div>
                <div className="flex flex-row"><li></li><span>It's best to arrive around 6.15pm to get a good seat</span></div>
                <div className="flex flex-row"><li></li><span>The address is 1 Chess Road, Claremont, the castle makes it hard to miss.</span></div>
                <div className="flex flex-row"><li></li><span>Parking is available near the entrance gate located at the Western Province Cricket Club side of the community centre</span></div>
                <div className="flex flex-row"><li></li><span>For the sake of the elves please mark your children's gifts clearly</span></div>
                <div className="flex flex-row"><li></li><span>If you have a last minute addition to your party, please just pay their entry fee at the gate</span></div>
                <div className="flex flex-row"><li></li><span>Remember to bring something warm to wear, it's Cape Town after all</span></div>
                <div className="flex flex-row"><li></li><span>The elves are partial to chocolate</span></div>
                <div className="flex flex-row"><li></li><span>The clowns and goblins might try to steal your socks</span></div>
                <div className="flex flex-row"><li></li><span>Rudolph has hay-fever so he prefers to stay inside the castle</span></div>
            </div>
        </div>
    )
}

export default PartyDetails