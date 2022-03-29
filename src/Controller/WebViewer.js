import React, {useState, useEffect, useContext, useRef} from 'react'
import WebViewer from '@pdftron/webviewer';

const WebViewerTest = () => {
    const viewer = useRef(null)

    useEffect(() => {
        WebViewer({
            path: '/webviewer/lib',
            initialDoc: './ProductsCategories.pdf'
        },
        viewer.current,
        ).then((instance) => {
            const {docViewer} = instance;
            const annotationManager = docViewer.getAnnotationManager();
        });
    }, [])

    return (
        <div>
            <h1>WebViewer</h1>
        </div>
    )
}

export default WebViewerTest
