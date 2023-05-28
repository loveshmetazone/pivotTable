import React, {useEffect, useState} from 'react';
import AppModal from "../lib/Modal/AppModal";
import AppDropdown from "../lib/AppDropdown/AppDropdown";
import {AggregatorArray} from "../../helper/Utility";
import {useDispatch, useSelector} from "react-redux";
import {setAggregator, setColsToPivot, setRowsToPivot} from "../../reduxState/actions";
import AppButton from "../lib/AppButton/AppButton";
import "./FieldModalStyle.css"

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Fields modal component.
 */
const FieldsModal = ({visible, onRequestClose}) => {

    const {
        allFields,
        rowsToPivot,
        colsToPivot,
        aggregationDimension,
        aggregator
    } = useSelector(((state) => state.pivotReducer))
    const [pivotRows, setPivotRows] = useState(rowsToPivot)
    const [pivotColumns, setPivotColumns] = useState(colsToPivot)
    const [aggregatorValue, setAggregatorValue] = useState(aggregator)
    const dispatch = useDispatch();

    useEffect(() => {
        setAggregatorValue(aggregator)
    }, [visible, aggregator]);

    useEffect(() => {
        setPivotRows(rowsToPivot)
    }, [visible,rowsToPivot])

    useEffect(() => {
        setPivotColumns(colsToPivot)
    }, [visible,colsToPivot])

    /**
     * @author Lovesh Singh.
     * @since 28-05-2023.
     * @description called on change rows checked item value.
     */
    const onChangeRowsChecked = (e) => {
        const rowItem = e.target.value;
        const foundRowItem = pivotRows.find((row) => row === rowItem);
        if (foundRowItem) {
            setPivotRows(pivotRows.filter((row) => row !== rowItem))
        } else {
            setPivotRows([...pivotRows, rowItem])
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 28-05-2023.
     * @description called on change columns checked item value.
     */
    const onChangeColumnsChecked = (e) => {
        const columnItem = e.target.value;
        const foundColumnItem = pivotColumns.find((column) => column === columnItem);
        if (foundColumnItem) {
            setPivotColumns(pivotColumns.filter((column) => column !== columnItem))
        } else {
            setPivotColumns([...pivotColumns, columnItem])
        }
    }


    /**
     * @author Lovesh Singh.
     * @since 25-05-2023.
     * @description called on change aggregator value.
     */
    const onChangeAggregator = (e) => {
        setAggregatorValue(e.target.value)
    }

    /**
     * @author Lovesh Singh.
     * @since 25-05-2023.
     * @description Apply button action handler.
     */
    const onApplyPress = () => {
        dispatch(setColsToPivot(pivotColumns))
        dispatch(setRowsToPivot(pivotRows))
        dispatch(setAggregator(aggregatorValue))
        onRequestClose()
    }

    return (
        <AppModal show={visible} onRequestClose={onRequestClose}>
            <div className={"field-modal"}>
                <div className={"field-modal__heading-wrapper"}>
                    <p className={"field-modal__heading"}>Fields</p>
                    <div>
                        <AppButton label={"Cancel"} type={"secondary"} onClick={onRequestClose}/>
                        <AppButton label={"Apply"} type={"primary"} onClick={onApplyPress}/>
                    </div>
                </div>

                <div className={"field-modal__fields-wrapper"}>
                    <FieldContainer heading={"Columns"} data={allFields} selectedData={pivotColumns}
                                    onChangeItemChecked={onChangeColumnsChecked}/>
                    <FieldContainer heading={"Rows"} data={allFields} selectedData={pivotRows}
                                    onChangeItemChecked={onChangeRowsChecked}/>
                    <AggregateFieldContainer heading={"Values"} data={`${aggregatorValue} of ${aggregationDimension}`}
                                             aggregatorValue={aggregatorValue} onChangeAggregator={onChangeAggregator}/>
                </div>
            </div>
        </AppModal>
    )
}

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Fields container component.
 */
const FieldContainer = ({heading, data, selectedData, onChangeItemChecked}) => {

    return (
        <div className={"field-modal__fields-container"}>
            <p className={"field-modal__fields-container-heading"}>{heading}</p>
            <div className={"field-modal__fields-items-wrapper"}>
                {
                    data.map((item, index) => {
                        return (
                            <FieldItem key={index} title={item} checked={selectedData.includes(item)}
                                       onChangeItemChecked={onChangeItemChecked}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Aggregate Fields modal component.
 */
const AggregateFieldContainer = ({heading, data, aggregatorValue, onChangeAggregator}) => {
    return (
        <div className={"field-modal__fields-container"}>
            <p className={"field-modal__fields-container-heading"}>{heading}</p>
            {/*{*/}
            {/*    data.map((item, index) => {*/}
            {/*        console.log("Render item: ", item)*/}
            {/*        return (*/}
            {/*            <AggregateFieldItem key={index} title={item}/>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
            <div className={"field-modal__fields-items-wrapper"}>
                <AggregateFieldItem title={data} checked={false} aggregatorValue={aggregatorValue}
                                    onChangeAggregator={onChangeAggregator}/>
            </div>
        </div>
    )
}

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Fields item component.
 */
const FieldItem = ({title, checked, onChangeItemChecked}) => {
    return (
        <div className={"field-modal__fields-item-container"}>
            <input type="checkbox" id={title} name={title} value={title} checked={checked}
                   onChange={onChangeItemChecked}/>
            <p className={"field-modal__fields-item"}>{title}</p>
        </div>
    )
}

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Aggregate Fields item component.
 */
const AggregateFieldItem = ({title, checked, aggregatorValue, onChangeAggregator}) => {

    return (
        <div className={"field-modal__fields-item-container"}>
            <input type="checkbox" id={title} name={title} value={title} checked={checked}
                   onChange={() => {
                   }}/>
            <p className={"field-modal__fields-item"}>{title}</p>
            <AppDropdown value={aggregatorValue} label={aggregatorValue} onChange={onChangeAggregator}
                         options={AggregatorArray}/>
        </div>
    )
}

export default FieldsModal;