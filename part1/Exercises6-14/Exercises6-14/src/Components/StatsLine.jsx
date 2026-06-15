import '../CSS/Table.css'

const StatsLine = ({ text, stat }) => {

  return (
    (text === 'Positive' ?
      <tr>
        <td>{text}</td> 
        <td>{stat}%</td>
      </tr> :
      <tr>
        <td>{text}</td> 
        <td>{stat}</td>
      </tr>
    ))
}

export default StatsLine