import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from '../../confing';
import { Rootstate } from '../../models';
import { addAllUser, addUser, deleteUser } from '../../models/members';
import styled from "styled-components";
import { Button } from "antd";
import Table from '../../widget/TableWidget';
import { RequestAuth } from '../../models/Request';

export interface IApproveUser {
    profile: string;
    nickname: string;
    sex: string;
    requestDay: number;
    address: string;
}
const Styles = styled.div`
  padding: 1rem;

  table {
    width:100%;
    text-align: center;
    border-spacing: 0;
    border: 2px solid black;
     tr{
      :last-child {
          td {
            /* border-bottom: 0; */
          }
        }
     }
  }
  th, td{
      margin:0;
      /* padding-right: 1rem; */
      padding:20px;
      border-bottom: 2px solid black;
      border-right: 2px solid white;
      
      :last-child {
        /* border-right: 0; */
      }
  }
  .pagination {
    padding: 0.5rem;
  }
`;





export default function ApprovePage() {
    const requestUser = useSelector((store: Rootstate) => store.members.user);
    const admin = useSelector((store: Rootstate) => store.admin.adminInfo);
    const dispatch = useDispatch();
    const appendData = async () => {
        try {
            // const response = await axios.get(`http://${SERVER_URL}/admin/approve/list`,
            //     {
            //         headers: { "Authorization": `Bearer ${admin?.access_token}` }
            //     });
            const response = await RequestAuth("GET","/admin/approve/list")
            const info = response.data
            console.log("dd",response)
            dispatch(addAllUser(info));
            //message.success(`${response.data.results.length} more users loaded!`);

        } catch (e) {
            console.log("Error", e);
        }
    };

    useEffect(() => {
        if (!admin) return;
        appendData();
    }, [admin]);

    const onClickApprove = (address: string) => { //승인하기

        const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
        if (approvedUser) {
            dispatch(addUser(approvedUser));
            dispatch(deleteUser(approvedUser));
        }
        RequestAuth("POST", "/admin/approve/complete",
            {
                address: approvedUser?.address,
                requestDay: approvedUser?.requestDay,
                requestPlace:approvedUser?.requestPlace
            })

    };
    const onClickReject = (address: string) => { //거절하기

        const approvedUser = requestUser.find((data) => data.address === address); //승인하기 버튼 누른 유저정보
        if (approvedUser) {
            dispatch(deleteUser(approvedUser));
        }
        RequestAuth("POST", "/admin/approve/reject",
            {
                address: approvedUser?.address,
                requestDay: approvedUser?.requestDay,
                requestPlace:approvedUser?.requestPlace
            })
    };

    //@@@@@ react-table@@@@@
    const columnData = [
        {
            Header: '프로필',
            accessor: 'profile'
        },
        {
            Header: '닉네임',
            accessor: 'nickname'
        },
        {
            Header: '성별',
            accessor: 'sex'
        },
        {
            Header: '만료일',
            accessor: 'requestDay'
        },
        {
            Header: '지갑 주소',
            accessor: 'address'
        },
        {
            Header: '버튼',
            accessor: 'button'
        }
    ];
    const columns = useMemo(() => columnData, []);

    const temp = useMemo(() => [
        {
            "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd', "button": (
                <ButtonWrapper>
                    <Button id="btn1" type="primary" ghost >승인하기</Button>
                    <Button id="btn2" type="primary" danger >거절하기</Button>
                </ButtonWrapper>)
        },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '자', "requestDay": 27, "address": '233333332' },
        { "nickname": 'ba', "sex": '자', "requestDay": 27, "address": '0x21232nbnj23j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'ba', "sex": '자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '233' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": 'rrfefeeree' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '24242424' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": 'hgghggrg' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },
        { "nickname": 'aa', "sex": '남자', "requestDay": 27, "address": '0x21232nbnj2j2pnijo2203123223n2n32n32j3kd' },

    ], [])
    const data = useMemo(() => requestUser.map(v => ({
        // "profile" : v.user.profile,
        "nickname": v.user.nickname,
        "sex": v.user.sex,
        "requestDay": v.requestDay,
        "address": v.address,
        "button": (
            <ButtonWrapper>
                <Button id="btn1" type="primary" ghost onClick={() => onClickApprove(v.address)}>승인하기</Button>
                <Button id="btn2" type="primary" danger ghost onClick={() => onClickReject(v.address)}>거절하기</Button>
            </ButtonWrapper>)
    })), [requestUser])

    useEffect(() => {
        console.log("data", data)
    }, [data])


    return (
        <Styles>
            <Table columns={columns} data={temp} />
        </Styles>

    )
}
const ButtonWrapper = styled.div`

    #btn1{
    margin-right:10px;
    }
`
