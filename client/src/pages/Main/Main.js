import Header from '../../components/Header/Header'
import MAP from '../../components/MAP/MAP';

function Main() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <h1>Click a state to find amusement parks</h1>
            </div>
            <div className='row' style={{ 'justifyContent': 'center' }}>
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                    <MAP />
                </div>
            </div>
        </div>
    )
}

export default Main;