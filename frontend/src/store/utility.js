/*
    THIS FUNCTIONS HELPS TO UPDATE THE STATE IN AN IMMUTABLE FASHION
    DON'T CHANGE THE FUNCTION
*/
export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};
