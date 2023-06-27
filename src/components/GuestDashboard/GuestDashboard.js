import "./GuestDashboard.scss"

const GuestDashboard = (props) => {
    const imageNames = ['badminton.png', 'basketball.png', 'cycling.png', 'hiking.png'];

    return (
        <>
        <div className="content-wrapper">
        <h1>Guest page</h1>
        <h3>Benefits of Physical Activity</h3>
        <div className="creative-div">
      <div className="boundary">
      <p className="intro-text"> Regular physical activity is one of the most important things you can do for your health. Being physically active can improve your brain health, help manage weight, reduce the risk of disease, strengthen bones and muscles, and improve your ability to do everyday activities.

Adults who sit less and do any amount of moderate-to-vigorous physical activity gain some health benefits. Only a few lifestyle choices have as large an impact on your health as physical activity.

Everyone can experience the health benefits of physical activity age, abilities, ethnicity, shape, or size do not matter.</p>

      </div>
    </div>
       <div className="image-grid">
      {imageNames.map((imageName, index) => (
        <div key={index} className="image-wrapper">
          <img className= "img-src" src={require(`../../Assets/Images/${imageName}`)} alt={imageName} />
        </div>
      ))}
    </div>
    </div>
        </>

    )
}

export default GuestDashboard;