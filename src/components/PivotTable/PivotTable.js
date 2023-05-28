import React, {useEffect, useState} from 'react'
import Pivot from 'quick-pivot';
import sampleData from "../../assets/sample-bloated-data.json"
import FieldsModal from "../FieldModal/FieldsModal";
import AppIcon from "../lib/AppIcon/AppIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    setAggregationDimension,
    setAggregator,
    setAllFields,
    setColsToPivot,
    setRowsToPivot
} from "../../reduxState/actions";
import {Constant} from "../../helper/Constant";
import {DataGridPro} from "@mui/x-data-grid-pro";

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Pivot Table Component
 */
const PivotTable = () => {

    const [showFieldsModal, setShowFieldsModal] = useState(false);
    const {rowsToPivot, colsToPivot, aggregationDimension, aggregator} = useSelector(((state) => state.pivotReducer))
    const dispatch = useDispatch();
    const [pivotTableColumns, setPivotTableColumns] = useState([]);
    const [pivotTableRows, setPivotTableRows] = useState([]);
    let columnStringArray = []

    useEffect(() => {
        dispatch(setAllFields(Object.keys(sampleData[0])))
        dispatch(setRowsToPivot(['Booking State', 'Booking City', 'Booking PinCode']))
        dispatch(setColsToPivot(['Mode']))
        dispatch(setAggregationDimension('Seats Booked'))
        dispatch(setAggregator('sum'))
    }, [])

    useEffect(() => {
        createPivotTableData()
        setPivotTableColumns(columnStringArray.filter((column) => {
            return column.field !== columnStringArray[0].field
        }))
    }, [rowsToPivot, colsToPivot, aggregationDimension, aggregator]);

    /**
     * @author Lovesh Singh.
     * @since 25-05-2023.
     * @description to convert array Strings into pivot object.
     */
    const convertArrayToDataObj = (data) => {
        const obj = {}
        data.forEach((element, i) => {
            obj[columnStringArray[i].field] = element;
        });
        return obj;
    }

    /**
     * @author Lovesh Singh.
     * @since 28-05-2023.
     * @description to convert columns for data grid.
     */
    const convertColumnForDataGrid = (columns) => {
        return columns.map((column) => {
            return {field: column.replace(/ /g, '').toLowerCase(), headerName: column}
        });
    }

    /**
     * @author Lovesh Singh.
     * @since 28-05-2023.
     * @description to get previous hierarchies from current row.
     */
    const getPreviousHierarchies = (table, currentIndex) => {
        let previousHierarchies: any = []
        let currentRowDepth = table[currentIndex].depth;
        for (let i = currentIndex - 1; i > 0; i--) {
            if (table[i].depth < currentRowDepth) {
                let j = 0;
                previousHierarchies.splice(j, 0, table[i].value[0])
                j++;
                currentRowDepth = table[i].depth;

                if (table[i].depth === 0)
                    break;
            }
        }
        return previousHierarchies;
    }

    /**
     * @author Lovesh Singh.
     * @since 25-05-2023.
     * @description to create pivot table data.
     */
    const createPivotTableData = () => {

        let rowStringArray: any = []

        if (rowsToPivot && colsToPivot && aggregationDimension && aggregator) {

            const pivot = new Pivot(sampleData, rowsToPivot, colsToPivot, aggregationDimension, aggregator);
            const pivotTable: [] = pivot?.data.table;

            for (let i = 0; i < pivotTable.length; i++) {

                if (pivotTable[i].type === Constant.colHeader) {
                    columnStringArray = convertColumnForDataGrid(pivotTable[i].value)
                }

                if (columnStringArray && (pivotTable[i].type === Constant.rowHeader || pivotTable[i].type === Constant.data)) {
                    let rowObj = convertArrayToDataObj(pivotTable[i].value)
                    rowObj[Constant.id] = pivotTable[i].row;
                    let hierarchy: any = getPreviousHierarchies(pivotTable, i)
                    hierarchy.push(rowObj[columnStringArray[0].field])
                    rowObj[Constant.hierarchy] = hierarchy;
                    delete rowObj[columnStringArray[0].field]
                    rowStringArray.push(rowObj)
                }
            }

            setPivotTableRows(rowStringArray)
        }

    }

    // console.log("Columns row: ", pivotTableColumns)
    // console.log("Rows data: ", pivotTableRows)

    const getTreeDataPath = (row) => row.hierarchy;

    return (
        <>
            <AppIcon onClick={() => setShowFieldsModal(!showFieldsModal)}
                     style={{cursor: "pointer", marginLeft: 'auto', marginRight: '1rem',}} name={'mdi:table-cog'}
                     color={"rgba(0, 0, 0, 0.54)"} size={30}/>
            <DataGridPro
                treeData
                rows={pivotTableRows}
                columns={pivotTableColumns}
                getTreeDataPath={getTreeDataPath}
                pagination={true}
                initialState={{
                    pagination: {paginationModel: {pageSize: 10}},
                }}
                pageSizeOptions={[5, 10, 25]}
            />
            <FieldsModal visible={showFieldsModal} onRequestClose={() => setShowFieldsModal(!showFieldsModal)}
                         colsToPivot={colsToPivot} rowsToPivot={rowsToPivot}
                         aggregationDimension={aggregationDimension}/>
        </>
    )
}

export default PivotTable