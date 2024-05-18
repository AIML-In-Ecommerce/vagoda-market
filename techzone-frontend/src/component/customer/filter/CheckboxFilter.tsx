import { Checkbox, CheckboxProps } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";

interface CheckboxFilterProps {
  filterCriteria: string;
  options: string[];
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string, value: any) => void;
  isFiltered: boolean;
}

export default function CheckboxFilter(props: CheckboxFilterProps) {
  const defaultCheckedList = props.options;
  const CheckboxGroup = Checkbox.Group;

  const [checkedCategoryList, setCheckedCategoryList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = props.options.length === checkedCategoryList.length;
  const indeterminate =
    checkedCategoryList.length > 0 &&
    checkedCategoryList.length < props.options.length;

  const onChangeCheckboxCategory = (list: CheckboxValueType[]) => {
    props.addFilter("category", list);
    setCheckedCategoryList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedCategoryList(e.target.checked ? props.options : []);
  };

  return (
    <>
      <h3 className="font-semibold my-4">{props.filterCriteria}</h3>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>

      <CheckboxGroup
        options={props.options}
        value={props.isFiltered ? checkedCategoryList : defaultCheckedList}
        onChange={onChangeCheckboxCategory}
      />
    </>
  );
}
