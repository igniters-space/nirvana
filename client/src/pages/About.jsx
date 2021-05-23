import React from 'react'
import '../styles/About.css'

const About = () => {
  return (
  <div className="container">
  	  <h2> Guide to Nirvana</h2>
  	  <p>Nirvana is a web app aimed to provide happiness and motivation in times of despair and at any time. It reduces imposter syndrome by providing instances of time you've accomplished something or the tasks you've completed. It lets you pour your feelings out and reflect on your failures for improvement.</p>
	  <div className="container__happiness">
	  	<h3> Jar Of Happiness </h3>
	  	<p>This jar is meant to bring happiness to you. Follow these instructions to fulfill the desire of the box</p>
	  </div>
	  <div className="container__sadness">
	  	<h3> Jar Of Sadness </h3>
	  	<p>This jar is meant to improve yourself by reflecting on your past actions and failures. Follow these instructions to fulfill the desire of the box</p>
	  </div>
	  <div className="container__todoApp">
	  	<h3> To-do App </h3>
	  	<p>This is aimed to boost your productivity. Add the tasks you wish to accomplish in your day. For every task you complete, the happiness level increases. You can recheck the tasks you've completed in the completed section.</p>
	  </div>
  </div>
  );
}

export default About