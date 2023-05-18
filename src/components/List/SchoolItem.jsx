import React, { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import MajorItem from "./MajorItem";
const SchoolItem = ({
  item,
  index,
  length,
  addSchoolItem,
  removeSchoolItem,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [school, setSchool] = useState(item.school);
  const [univMajorList, setUnivMajorList] = useState([
    {
      id: 0,
      unit: "주전공",
      major: "",
    },
  ]);
  const nextMajorId = useRef(1);
  const addUnivMajorItem = () => {
    const majorItem = {
      id: nextMajorId.current,
      unit: "주전공",
      major: "",
    };
    setUnivMajorList((current) => [...current, majorItem]);
    nextMajorId.current += 1;
    console.log("Add major", majorItem, nextMajorId);
  };
  const removeUnivMajorItem = (i) => {
    setUnivMajorList(univMajorList.filter((a) => a.id !== i));
    console.log("delete major", i);
  };
  return (
    <>
      <InputForm>
        <SchoolSelect
          name="school"
          onChange={(e) => {
            item.school = e.target.value;
            console.log(e.target.value);
            setSchool(e.target.value);
          }}
        >
          <option name="school" value="고등학교">
            고등학교
          </option>
          <option name="school" value="대학교">
            대학교
          </option>
        </SchoolSelect>
        <Input
          placeholder="학교명"
          size="small"
          width="150px"
          onChange={(e) => {
            item.schoolName = e.target.value;
          }}
        />
        <DatePicker
          placeholderText="입학 날짜"
          dateFormat="yyyy-MM-dd"
          shouldCloseOnSelect
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            item.startDate = date;
          }}
          showMonthDropdown
          showYearDropdown
          showIcon
        />
        <div style={{ display: "flex", alignItems: "center" }}>~</div>
        <DatePicker
          selected={endDate}
          placeholderText="졸업 날짜"
          dateFormat="yyyy-MM-dd"
          minDate={startDate}
          shouldCloseOnSelect
          onChange={(date) => {
            setEndDate(date);
            item.endDate = date;
          }}
          showMonthDropdown
          showYearDropdown
          showIcon
        />

        <SchoolSelect
          name="state"
          onChange={(e) => {
            item.state = e.target.value;
          }}
        >
          <option name="state" value="졸업">
            졸업
          </option>
          <option name="state" value="졸업예정">
            졸업예정
          </option>
          <option name="state" value="재학">
            재학
          </option>
          <option name="state" value="휴학">
            휴학
          </option>
          <option name="state" value="자퇴">
            자퇴
          </option>
        </SchoolSelect>
        {index !== 0 ? (
          <Icon>
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                removeSchoolItem(item.id);
              }}
            />
          </Icon>
        ) : (
          ""
        )}
        {index === length - 1 ? (
          <Icon>
            <FontAwesomeIcon icon={faPlusCircle} onClick={addSchoolItem} />
          </Icon>
        ) : (
          ""
        )}
      </InputForm>
      {school === "대학교"
        ? univMajorList.map((majorItem, idx) => {
            console.log(univMajorList);
            return (
              <Form key={majorItem.id}>
                <MajorItem
                  item={majorItem}
                  index={idx}
                  length={univMajorList.length}
                  addUnivMajorItem={addUnivMajorItem}
                  removeUnivMajorItem={removeUnivMajorItem}
                />
              </Form>
            );
          })
        : ""}
    </>
  );
};

export default SchoolItem;

const InputForm = styled.div`
  display: flex;
  min-width: 25rem;
  justify-content: space-between;
  margin-bottom: 5px;
  gap: 10px;
  height: 3rem;
`;
const SchoolSelect = styled.select`
  min-width: 9rem;
  text-align: center;
  background-color: #eaeaea;
  height: 2.5rem;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-bottom: 10px;
  gap: 10px;
  height: 3rem;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2f5383;
  height: 100%;
  svg {
    height: 2rem;
    cursor: pointer;
  }
`;
