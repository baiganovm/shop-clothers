import React from "react";

import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { CollectionItemsContainer, CollectionPageContainer, CollectionTitle } from "./collection.styles";


const CollectionPage = ({collection}) => {

    /*useEffect(() => {
        const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => {
        });
        return () => {
            unsubscribeFromCollections();
        }
    }, []);*/

    const {title, items} = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);