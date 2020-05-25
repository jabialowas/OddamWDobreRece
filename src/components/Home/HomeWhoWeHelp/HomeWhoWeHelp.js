import React, {useEffect, useState} from 'react';
import Firebase from "../../Firebase";
import {withFirebase} from "../../Firebase";
import 'firebase/database'
import './HomeWhoWeHelp.scss'
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";

function HomeWhoWeHelp(props) {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(3)
    const [category,setCategory] = useState('' || 'foundations')

    useEffect(() => {
        setLoading(true);
        props.firebase.siteInfo().on('value', snapshot => {
                    setData(snapshot.val());
                    setLoading(false);
        });
    },[])

    function handleClick(event) {
       setCurrentPage(event.target.id);
        event.target.parentElement.childNodes.forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }

    function handleClickHeader(event) {
        event.target.parentElement.parentElement.lastElementChild.childNodes.forEach(el => el.classList.remove('active'));
        event.target.parentElement.parentElement.lastElementChild.firstElementChild.classList.add('active');
        setCategory(event.target.id);
        setCurrentPage(1)
        event.target.parentElement.childNodes.forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }
    if(data && !loading){
        let categoryData = 'foundations';
        if(category === 'foundations'){
            categoryData = data.foundations
        } else if(category === 'organizations'){
            categoryData = data.organizations
        } else if(category === 'local'){
            categoryData = data.local
        }

        const lastPost = currentPage * postPerPage;
        const firstPost = lastPost - postPerPage;
        const currentPosts = categoryData.slice(firstPost,lastPost)


        const renderHeader = () => {
            return (
                <ul className='who-header'>
                    <li className='header-item active'  id='foundations' onClick={handleClickHeader}>Fundacjom</li>
                    <li className='header-item' id='organizations' onClick={handleClickHeader}>Organizacjom<br/> pozarządowym</li>
                    <li className='header-item' id='local' onClick={handleClickHeader}>Lokalnym<br/>zbiórkom</li>
                </ul>
            )
        }

        //page numbers
        const pageNumbers = [];
        for (let i=0; i<Math.ceil(categoryData.length/ postPerPage); i++) {
            pageNumbers.push(i+1)
        }


        //Render posts
        const renderPosts = currentPosts.map((post,index) =>{
            return  (<>
                <li key={index}><h3 className='who-name'>{post.name}</h3>
                    <div className='who-disc-cnt'>
            <p className='who-description'>{post.description}</p>
                        <p className='who-needs'>{post.needs}</p>
                    </div></li>
                <hr/>
                </>
            )

        })
        //Render Pagination numbers
        const renderPageNumbers = pageNumbers.map((number,index) => {

            const cls = (number === 1) ? 'page-numbers-item active' : 'page-numbers-item';
            return (
                <li
                    className={cls}
                    key={number}
                    id={number}
                    onClick={handleClick}
                >
                    {number}
                </li>
            );
        });
        return(
            <div className='who-cnt'>
                <h2 className='cnt-title'>Komu pomagamy?</h2>
                <Decoration/>
                {renderHeader()}

                <p className='cnt-description'>W naszej bazie znajdziesz listę zweryfikowanych Fundacji, z którymi współpracujemy. Możesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują.</p>
            <ul className='who-list'>
                {renderPosts}
            </ul>
        <ul className='who-page-numbers' id="page-numbers">
            {renderPageNumbers}
        </ul>
    </div>
    );
    }
    return null;
}

export default withFirebase(HomeWhoWeHelp);