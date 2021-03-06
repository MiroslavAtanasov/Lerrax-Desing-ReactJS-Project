import React, { useState, useEffect, useCallback } from 'react'
import styles from './index.module.css'
import Article from '../../../components/article'
import Aside from '../../../components/aside'
import PageLayout from '../../../components/page-layout'
import PageTitle from '../../../components/helmet'


const Articles = ({ title, type }) => {
    const [articles, setArticles] = useState([])

    const OnClick = async (value) => {
        const promise = await fetch(`http://localhost:8888/api/article/${value}/${type}`)
        const articles = await promise.json()
        setArticles(articles)
    }

    const getArticles = useCallback(async () => {
        const promise = await fetch(`http://localhost:8888/api/article/${type}`)
        const articles = await promise.json()

        setArticles(articles)
    }, [type])

    const renderArticle = () => {
        return articles.map((article, index) => {
            return (
                <Article key={article._id} index={index} {...article} />
            )
        })
    }

    useEffect(() => {
        getArticles()
    }, [getArticles])


    return (
        <PageLayout>
            <div className={styles.container}>
                <PageTitle title={`${title} | Lerrax Design`} />
                <Aside />
                <div className={styles.main}>
                    <div className={styles.div}>
                        <p>{type}</p>
                        <span><strong>Sort by: </strong></span>
                        <button onClick={() => OnClick("sortH")}>Price: High to Low</button>
                        <button onClick={() => OnClick("sortL")}>Price: Low to High</button>
                        <button onClick={() => OnClick("likes")}>Rating</button>
                    </div>
                    {renderArticle()}
                </div>
            </div>
        </PageLayout>
    )
}

export default Articles