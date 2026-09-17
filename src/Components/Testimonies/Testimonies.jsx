import { useEffect, useState } from "react";

export function Testimonies({testimonyData}) {
    const [TestimonieIndex, setTestimonieIndex] = useState([])
    const [testimonialnum, settestimonialnum] = useState(0)
    
    useEffect(() => {
        const interval = setInterval(() => {
    
            if (TestimonieIndex < testimonyData.length - 1){
                setTestimonieIndex(prev => prev +1)
            }   
            else setTestimonieIndex(0)
    },3000)

    // useEffect(() => {
        

    // })

    return () => clearInterval(interval)
},[])

  return (
    <>
      {testimonyData?.map((testimonial) => (
        <article key={testimonial.id}>
          <h4>{testimonial.title}</h4>
          <br />
          <p>{testimonial.content}</p>
          <br />
          <h3>{testimonial.name}</h3>
        </article>
      ))}
    </>
  );
}