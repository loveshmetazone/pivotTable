import {AGGREGATION_DIMENSION, AGGREGATOR, ALL_FIELDS, COLUMNS_TO_PIVOT, ROWS_TO_PIVOT} from "../../actions/types";

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description pivot initial default state.
 */
const INITIAL_STATE = {
    allFields: [],
    rowsToPivot: [],
    colsToPivot: [],
    aggregationDimension: '',
    aggregator: undefined,
}

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Pivot state handler.
 * @see INITIAL_STATE
 */
const PivotReducer= (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALL_FIELDS: {
            return {
                ...state,
                allFields: action.payload
            }
        }
        case ROWS_TO_PIVOT: {
            return {
                ...state,
                rowsToPivot: action.payload
            }
        }
        case COLUMNS_TO_PIVOT: {
            return {
                ...state,
                colsToPivot: action.payload
            }
        }
        case AGGREGATION_DIMENSION: {
            return {
                ...state,
                aggregationDimension: action.payload
            }
        }
        case AGGREGATOR: {
            return {
                ...state,
                aggregator: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default PivotReducer