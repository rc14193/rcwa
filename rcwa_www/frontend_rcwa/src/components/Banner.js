import "../App.css"
import {GithubFilled} from '@ant-design/icons'

export default function Banner() {
    return (
      <header className="banner">
          <div>
            Rigorous Coupled Wave Analysis (RCWA) 
          </div>
          <a className="gitLink" href="https://github.com/edmundsj/rcwa"><GithubFilled /></a>
      </header>
    )
}