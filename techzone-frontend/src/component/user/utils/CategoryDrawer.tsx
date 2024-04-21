'use client'

import { Button, Drawer, Flex, Popover, Tooltip, Typography } from "antd";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";


interface CategoryDrawerProps
{

}


const MockData = 
{
    "category": [
        {
            "_id": "c-01",
            "key": "ck-01",
            "urlKey": "urlkc-01",
            "name": "Laptop",
            "image": "",
            "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
        },
        {
            "_id": "c-02",
            "key": "ck-02",
            "urlKey": "urlkc-02",
            "name": "Laptop 2",
            "image": "",
            "subCategoryType": ["sct-01", "sct-03", "sct-04"]
        }

    ],

    "subCategoryType": [
        {
            "_id": "sct-01",
            "key": "sct-laptop-01",
            "urlKey": "urlk-01",
            "name": "Thương hiệu",
            "subCategory": ["sc-01", "sc-02", "sc-03", "sc-04", "sc-05", "sc-06", "sc-07", "sc-08", "sc-09", "sc-10"]
        },
        {
            "_id": "sct-02",
            "key": "sct-laptop-02",
            "urlKey": "urlk-02",
            "name": "Cấu hình",
            "subCategory": ["sc-11", "sc-12", "sc-13", "sc-14", "sc-15", "sc-16", "sc-17", "sc-18", "sc-19"]
        },
        {
            "_id": "sct-03",
            "key": "sct-laptop-03",
            "urlKey": "urlk-03",
            "name": "Kích thước",
            "subCategory": ["sc-20", "sc-21", "sc-22", "sc-23"]
        },
        {
            "_id": "sct-04",
            "key": "sct-laptop-04",
            "urlKey": "urlk-04",
            "name": "Nhu cầu",
            "subCategory": ["sc-24", "sc-25", "sc-26", "sc-27"]
        },
        {
            "_id": "sct-05",
            "key": "sct-laptop-05",
            "urlKey": "urlk-05",
            "name": "Mức giá",
            "subCategory": ["sc-28", "sc-29", "sc-30", "sc-31"]
        }
    ],

    "subCategory": [
        {
            "_id": "sc-01",
            "key": "sck-01",
            "urlKey": "urlk-01",
            "name": "Apple",
            "image":""
        },
        {
            "_id": "sc-02",
            "key": "sck-02",
            "urlKey": "urlk-02",
            "name": "Acer",
            "image":""
        },
        {
            "_id": "sc-03",
            "key": "sck-03",
            "urlKey": "urlk-03",
            "name": "ASUS",
            "image":""
        },
        {
            "_id": "sc-04",
            "key": "sck-04",
            "urlKey": "urlk-04",
            "name": "Dell",
            "image":""
        },
        {
            "_id": "sc-05",
            "key": "sck-05",
            "urlKey": "urlk-05",
            "name": "HP",
            "image":""
        },
        {
            "_id": "sc-06",
            "key": "sck-06",
            "urlKey": "urlk-06",
            "name": "Lenovo",
            "image":""
        },
        {
            "_id": "sc-07",
            "key": "sck-07",
            "urlKey": "urlk-07",
            "name": "LG",
            "image":""
        },
        {
            "_id": "sc-08",
            "key": "sck-08",
            "urlKey": "urlk-08",
            "name": "MSI",
            "image":""
        },
        {
            "_id": "sc-09",
            "key": "sck-09",
            "urlKey": "urlk-09",
            "name": "Gigabyte",
            "image":""
        },
        {
            "_id": "sc-10",
            "key": "sck-10",
            "urlKey": "urlk-10",
            "name": "Microsoft",
            "image":""
        },
        {
            "_id": "sc-11",
            "key": "sck-11",
            "urlKey": "urlk-11",
            "name": "RTX 30 Series",
            "image":""
        },
        {
            "_id": "sc-12",
            "key": "sck-12",
            "urlKey": "urlk-012",
            "name": "RTX 40 Series",
            "image":""
        },
        {
            "_id": "sc-13",
            "key": "sck-13",
            "urlKey": "urlk-013",
            "name": "Intel i3",
            "image":""
        },
        {
            "_id": "sc-14",
            "key": "sck-14",
            "urlKey": "urlk-014",
            "name": "Intel i5",
            "image":""
        },
        {
            "_id": "sc-15",
            "key": "sck-15",
            "urlKey": "urlk-015",
            "name": "Itel i9",
            "image":""
        },
        {
            "_id": "sc-16",
            "key": "sck-16",
            "urlKey": "urlk-016",
            "name": "Ryzen 3",
            "image":""
        },
        {
            "_id": "sc-17",
            "key": "sck-17",
            "urlKey": "urlk-017",
            "name": "Ryzen 5",
            "image":""
        },
        {
            "_id": "sc-18",
            "key": "sck-18",
            "urlKey": "urlk-018",
            "name": "Ryzen 7",
            "image":""
        },
        {
            "_id": "sc-19",
            "key": "sck-19",
            "urlKey": "urlk-019",
            "name": "Dưới 13 inch",
            "image":""
        },
        {
            "_id": "sc-20",
            "key": "sck-20",
            "urlKey": "urlk-020",
            "name": "13-14 inch",
            "image":""
        },
        {
            "_id": "sc-21",
            "key": "sck-21",
            "urlKey": "urlk-021",
            "name": "15.6 inch",
            "image":""
        },
        {
            "_id": "sc-22",
            "key": "sck-22",
            "urlKey": "urlk-022",
            "name": "Laptop Gaming",
            "image":""
        },
        {
            "_id": "sc-23",
            "key": "sck-23",
            "urlKey": "urlk-023",
            "name": "Laptop Văn Phòng",
            "image":""
        },
        {
            "_id": "sc-24",
            "key": "sck-24",
            "urlKey": "urlk-024",
            "name": "Đồ họa - Studio",
            "image":""
        },
        {
            "_id": "sc-25",
            "key": "sck-25",
            "urlKey": "urlk-025",
            "name": "Work Station",
            "image":""
        },
        {
            "_id": "sc-26",
            "key": "sck-26",
            "urlKey": "urlk-026",
            "name": "Dưới 10 triệu",
            "image":""
        },
        {
            "_id": "sc-27",
            "key": "sck-27",
            "urlKey": "urlk-027",
            "name": "10 - 25 triệu",
            "image":""
        },
        {
            "_id": "sc-28",
            "key": "sck-28",
            "urlKey": "urlk-028",
            "name": "15 - 20 triệu",
            "image":""
        },
        {
            "_id": "sc-29",
            "key": "sck-29",
            "urlKey": "urlk-029",
            "name": "20 - 25 triệu",
            "image":""
        },
        {
            "_id": "sc-30",
            "key": "sck-30",
            "urlKey": "urlk-030",
            "name": "25 - 30 triệu",
            "image":""
        },
        {
            "_id": "sc-31",
            "key": "sck-31",
            "urlKey": "urlk-031",
            "name": "Trên 30 triệu",
            "image":""
        }
    ]
}

interface CategoryProps
{
    _id: string,
    key: string,
    urlKey: string,
    image: string,
    name: string,
    subCategoryType: string[]
}

interface SubCategoryTypeProps
{
    key: string,
    urlKey: string,
    name: string,
    subCategory: SubCategoryProps[]
}


interface SubCategoryProps
{
    _id: string,
    key: string,
    urlKey: string,
    name: string,
    image: string
}

export default function CategoryDrawer({}: CategoryDrawerProps)
{
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const drawerPlacement = 'left'
    
    const [subCategoryTypes, setSubCategoryTypes] = useState<Map<string, SubCategoryTypeProps>|undefined>(undefined)
    const [categories, setCategories] = useState<CategoryProps[]>([])

    const popoverTrigger = "hover"
    const popoverPlacement = "right"
    const popoverArrow = false

    useEffect(() =>
    {
        //fetch data here

        //for testing
        const extractedCategory = MockData.category
        setCategories(extractedCategory)

        //re-structure the data so that we can access sub-category quickly
        const extractedSubCategory = new Map()
        const extractedSubCategoryType = MockData.subCategoryType
        //assume that both extractedSubCategory.length and extractedSubCategoryType.length is always larger than 0

        MockData.subCategory.forEach((value) =>
        {
            extractedSubCategory.set(value._id, value)
        })

        let subCategoryTypeResult = new Map()
        extractedSubCategoryType.forEach((value) =>
        {
            const id = value._id
            const extractedAttributes: SubCategoryTypeProps = 
            {
                key: value.key,
                name: value.name,
                urlKey: value.urlKey,
                subCategory: []
            }
            

            value.subCategory.forEach((id) =>
            {
                const item = extractedSubCategory?.get(id)
                if(item !== undefined)
                {
                    extractedAttributes.subCategory.push(item)
                }
            })

            subCategoryTypeResult.set(id, extractedAttributes)
        })

        setSubCategoryTypes(subCategoryTypeResult)
    },
    [])

    function handleOpenDrawer()
    {
        setDrawerOpen(true)
    }

    function handleCloseDrawer()
    {
        setDrawerOpen(false)
    }

    function getPopoverContent(subCategoryTypeIds: string[])
    {

        return(
            <div className="w-full h-svh px-3 overflow-auto max-w-3/4">
                {
                    <Flex gap={40} justify="center" align="start">
                        {
                            subCategoryTypeIds.map((typeId: string, index: number) =>
                            {
                                const type = subCategoryTypes?.get(typeId)
                                if(type === undefined || type == null)
                                {
                                    return (
                                        <Typography.Text className="text-gray-700 text-lg">
                                            No service
                                        </Typography.Text>
                                    )
                                }
                                const typeContent = 
                                <>
                                    <Flex vertical={true} align="start" gap={6} className="mt-3">
                                        {
                                            type?.subCategory.map((value: SubCategoryProps) => 
                                            {
                                                return(
                                                        <Link key={typeId + value._id} href={"#"} prefetch={false}>
                                                            <Typography.Text className="text-base text-gray-700 hover:text-blue-500">
                                                                {value.name}
                                                            </Typography.Text>
                                                        </Link>
                                                )
                                            })
                                        }
                                    </Flex>
                                </>
                                return(
                                    <div key={typeId + index.toString()}>
                                        <Typography.Text className="text-lg text-blue-800 font-semibold">
                                            {type?.name}
                                        </Typography.Text>
                                        {typeContent}
                                    </div>
                                )
                            })
                        }
                    </Flex>
                }
            </div>
        )
    }

    const categoryDisplay = 
    <>
        <Flex vertical={true} gap={3}>
            {
                categories.map((value: CategoryProps) => 
                {

                    return(
                        <>
                            <Popover key={value._id} trigger={popoverTrigger} 
                                content={getPopoverContent(value.subCategoryType)}
                                placement={popoverPlacement}
                                arrow={popoverArrow}
                            >
                                <div className="w-full px-3 py-2 rounded-lg hover:bg-blue-50">
                                    <Typography.Text className="text-black font-semibold text-lg">
                                        {value.name}
                                    </Typography.Text>
                                </div>
                            </Popover>
                        </>
                    )
                })
            }
        </Flex>
    </>

    return(
        <>
            <div className="relative w-1/4 bg-blue-500 left-0"></div>
            <div className="absolute z-10 top-0">
                <Flex vertical className="h-svh bg-green-500" align="center" justify="center">
                    <Tooltip trigger={"hover"} title={"Open Category"} placement="right">
                        <Button className="fixed w-14 min-w-14 h-16 min-h-16 rounded-r-full border-0 ml-2 bg-transparent" onClick={handleOpenDrawer}>
                            <Flex className="w-full h-full ml-2" justify="end">
                                <IoIosArrowForward className="w-full h-full text-lg" size={"large"}/>
                            </Flex>
                    </Button>
                    </Tooltip>
                </Flex>
            </div>
            <Drawer open={drawerOpen} closable={true} onClose={handleCloseDrawer}
                
                title="Category"
                placement={drawerPlacement}
            >
                {categoryDisplay}
            </Drawer>
        </>
    )
}