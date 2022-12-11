import React, { useEffect, useState } from 'react';

const Reviews = () => {
    const [products, setProducts] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [show, setShow] = useState(false);
    const [productReviews, setProductReviews] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedViewer, setSelectedViewer] = useState({});

    async function getData() {
        const response = await fetch('products.json'); //change this to URL of Products
        return response;
    }

    async function getViewers() {
        const response = await fetch('viewers.json'); //change this to URL of Viewers
        return response;
    }

    useEffect(() => {
        getData()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data)
            })
    }, [])

    useEffect(() => {
        getViewers()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setViewers(data)
            })
    }, [])

    console.log(products);
    console.log(selectedProduct);
    console.log(productReviews);

    return (
        <div>
            <h1>Select from below Product Ids to see the details</h1>
            {
                products?.map((product, i) => <button key={i} onClick={() => {
                    setSelectedProduct(product)
                    setProductReviews(product.reviews)
                    setShow(false);
                    console.log(product);
                }}>{product?.id}</button>)
            }
            <h1>Select Viewers Id to access the data</h1>
            {
                viewers?.map(viewer => <button key={viewer.id} onClick={() => setSelectedViewer(viewer)}>{viewer.id}</button>)
            }
            <div>
                <h1>Title: {selectedProduct?.productName}</h1>
                <div>
                    {selectedViewer?.id &&
                        <div>
                            <h1>selected viewer id : {selectedViewer.id}</h1>
                            <h2>Comments : </h2>
                            {
                                productReviews?.map(pr => <p key={pr.reviewId}>{pr.review}</p>)
                            }
                        </div>
                    }
                </div>
                <h1>Usefulness: {selectedProduct?.userfulness}</h1>
                {(selectedViewer?.friends?.includes(selectedProduct.reviewerName)) && <h3>Reviewer: {selectedProduct.reviewerName}</h3>}
                <h1>Ratings: {selectedProduct?.ratings} starts</h1>
                <button onClick={()=>setShow(true)}>Show More</button>
                {
                    show && <p>Delivery Time: {selectedProduct?.deliveryTime}</p>
                }
            </div>
        </div>
    );
};

export default Reviews;