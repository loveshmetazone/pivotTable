import {AGGREGATION_DIMENSION, AGGREGATOR, ALL_FIELDS, COLUMNS_TO_PIVOT, ROWS_TO_PIVOT} from "./types";

/**
 * @author Lovesh Singh.
 * @since 28-05-2023.
 * @description to set all fields.
 */
export const setAllFields = (data) => ({
    type: ALL_FIELDS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description to set rowsToPivot.
 */
export const setRowsToPivot = (data) => ({
    type: ROWS_TO_PIVOT,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description to set colsToPivot.
 */
export const setColsToPivot = (data) => ({
    type: COLUMNS_TO_PIVOT,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description to set aggregationDimension.
 */
export const setAggregationDimension = (data) => ({
    type: AGGREGATION_DIMENSION,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description to set aggregator.
 */
export const setAggregator = (data) => ({
    type: AGGREGATOR,
    payload: data
});