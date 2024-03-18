import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getInternalStatus } from "../redux/internalStatus/actions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { RootState } from "../redux/store";
import {
  getAdminStaff,
  getConsultantStaffs,
  getConsultants,
  getLoanStatus,
} from "../redux/actions";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Drawer } from "antd";

const animatedComponents = makeAnimated();

const FilterModal = (props: any) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const roles = ["CRED_ADMIN", "CRED_STAFF"];

  const [selectedOptions, setSelectedOptions] = useState({
    internal_status_id: [],
    loan_status_id: [],
    assigned_cred_staff: [],
    consultant_name: [],
  });

  const isEmpty = () => {
    for (const key in selectedOptions) {
      if (selectedOptions[key as keyof typeof selectedOptions].length !== 0) {
        return false;
      }
    }
    return true;
  };

  const applyFilter = async () => {
    props.setIsLoading(true);
    let id = user?.role_name === "CONSULTANT_ADMIN" ? user.consultant_id : null;
    const { data } = await axios.post(
      "/cred_admin_user_students",
      id ? { selectedOptions, id } : selectedOptions
    );

    if (pathname === "/cred-admin/direct-students") {
      const modifiedData = data.data.filter(
        (item: any) => item.created_by != 0 && item.consultant_id == 0
      );
      props.setfilteredData(modifiedData);
    } else if (
      pathname === "/cred-admin/registered-students" ||
      pathname === "/users/registered-students"
    ) {
      const modifiedData = data.data.filter(
        (item: any) => item.created_by == 0
      );
      props.setfilteredData(modifiedData);
    } else if (pathname === "/users/intake-students") {
      const modifiedData = data.data.filter((item: any) => item.status == true);
      props.setfilteredData(modifiedData);
    } else if (pathname === "/users/direct-students") {
      const modifiedData = data.data.filter(
        (item: any) => item.created_by != 0 && item.consultant_id == 0
      );
      props.setfilteredData(modifiedData);
    } else {
      props.setfilteredData(data.data);
    }
    props.setIsLoading(false);
  };

  const handleStatusChange = (selectedValues: any, fieldName: any) => {
    setSelectedOptions({
      ...selectedOptions,
      [fieldName]: selectedValues.map((option: any) => option.value),
    });
  };

  const handleClear = () => {
    setSelectedOptions({
      internal_status_id: [],
      loan_status_id: [],
      assigned_cred_staff: [],
      consultant_name: [],
    });
    props.setfilteredData(props.data);
    props.setFilterModal(false);
  };

  const { internalStatus, user, loanStatus, staffs, consultants } = useSelector(
    (state: RootState) => ({
      internalStatus: state.InternalStatus.status.data,
      user: state.Auth.user,
      loanStatus: state.LoanStatus.status.data,
      staffs: state.AdminStaff.adminStaff.data,
      consultants: state?.ConsultantReducer.consultant.data,
    })
  );

  useEffect(() => {
    dispatch(getInternalStatus());
    dispatch(getLoanStatus());
    dispatch(getAdminStaff());
    dispatch(getConsultants());
  }, []);

  return (
    <Drawer
      title="Filters"
      placement="right"
      onClose={props.setFilterModal}
      open={props.filterModal}
    >
      <div className=" h-100 d-flex flex-column">
        <div className="d-flex flex-column w-100">
          <Row className="mb-1">
            <Col>
              <Form>
                <Row>
                  <Col className="mb-1">
                    <Form.Label>Filter by internal status</Form.Label>
                    <Select
                      isMulti
                      components={animatedComponents}
                      name="colors"
                      options={internalStatus?.map((status: any) => ({
                        label: status?.status_name,
                        value: status?.id,
                      }))}
                      placeholder="Internal status"
                      value={selectedOptions.internal_status_id.map((id) => ({
                        value: id,
                        label: internalStatus.filter(
                          (item: any) => item.id === id
                        )[0].status_name,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedValues) =>
                        handleStatusChange(selectedValues, "internal_status_id")
                      }
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row className="mb-1">
            <Col>
              <Form>
                <Row>
                  <Col className="mb-1">
                    <Form.Label>Filter by loan status</Form.Label>
                    <Select
                      isMulti
                      components={animatedComponents}
                      name="colors"
                      options={loanStatus?.map((status: any) => ({
                        label: status?.status_name,
                        value: status?.id,
                      }))}
                      placeholder="Loan status"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedOptions.loan_status_id.map((id) => ({
                        value: id,
                        label: loanStatus.filter(
                          (item: any) => item.id === id
                        )[0].status_name,
                      }))}
                      onChange={(selectedValues) =>
                        handleStatusChange(selectedValues, "loan_status_id")
                      }
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {roles.includes(user?.role_name) && (
            <Row className="mb-1-">
              <Col>
                <Form>
                  <Row>
                    <Col className="mb-1">
                      <Form.Label>Filter by consultants</Form.Label>
                      <Select
                        isMulti
                        components={animatedComponents}
                        name="colors"
                        options={consultants?.map((status: any) => ({
                          label: status?.company_name,
                          value: status?.company_name,
                        }))}
                        placeholder="Consultants"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedOptions.consultant_name.map((id) => ({
                          value: id,
                          label: `${id}`,
                        }))}
                        onChange={(selectedValues) =>
                          handleStatusChange(selectedValues, "consultant_name")
                        }
                      />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
          {user?.role_name === "CRED_ADMIN" && (
            <Row className="mb-1-">
              <Col>
                <Form>
                  <Row>
                    <Col className="mb-1">
                      <Form.Label>Filter by staffs</Form.Label>
                      <Select
                        isMulti
                        components={animatedComponents}
                        name="colors"
                        options={staffs?.map((status: any) => ({
                          label: `${status?.first_name} ${status?.last_name}`,
                          value: `${status?.first_name} ${status?.last_name}`,
                        }))}
                        placeholder="Staffs"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedOptions.assigned_cred_staff.map(
                          (id) => ({
                            value: id,
                            label: `${id}`,
                          })
                        )}
                        onChange={(selectedValues) =>
                          handleStatusChange(
                            selectedValues,
                            "assigned_cred_staff"
                          )
                        }
                      />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
        </div>

        <div className="d-flex gap-2 justify-content-end w-100">
          <Button
            variant="danger"
            id="button-addon2"
            className="mt-1 waves-effect waves-light"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant={isEmpty() ? "light" : "success"}
            id="button-addon2"
            className="mt-1 waves-effect waves-light"
            onClick={applyFilter}
            disabled={isEmpty()}
          >
            {"Apply"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterModal;
