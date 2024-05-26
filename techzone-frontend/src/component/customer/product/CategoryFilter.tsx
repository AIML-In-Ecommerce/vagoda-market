import { _CategoryType } from "@/model/CategoryType";
import { CategoryService } from "@/services/Category";
import type { TreeDataNode, TreeProps } from "antd";
import { Tree } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string, value: any) => void;
  isFiltered: boolean;
}

export default function CategoryFilter(props: CategoryFilterProps) {
  const getNodeLevel = (
    key: string,
    nodes: TreeDataNode[],
    level = 1
  ): number | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return level;
      }
      if (node.children) {
        const childLevel = getNodeLevel(key, node.children, level + 1);
        if (childLevel !== null) {
          return childLevel;
        }
      }
    }
    return null;
  };

  const convertToTreeDataNode = (category: _CategoryType): TreeDataNode => ({
    title: category.name,
    key: category._id,
    children: category.subCategories
      ? category.subCategories.map((item) => convertToTreeDataNode(item))
      : [],
  });

  const mergeCheckedKeys = (
    checkedNodes: TreeDataNode[]
  ): { id: string; name: string; level: number | null }[] => {
    const keysSet = new Set<{
      id: string;
      name: string;
      level: number | null;
    }>();
    const nodesToRemove = new Set<string>();

    const addKeys = (node: any) => {
      const level = getNodeLevel(node.key, allCategories);
      if (node.children && node.children.length > 0) {
        const allChildrenChecked = node.children.every((child: any) =>
          checkedNodes.some((n) => n.key === child.key)
        );

        if (allChildrenChecked) {
          keysSet.add({ id: node.key, name: node.title, level: level });
          node.children.forEach((child: any) => {
            nodesToRemove.add(child.key);
          });
        }
      } else {
        keysSet.add({ id: node.key, name: node.title, level: level });
      }
    };

    checkedNodes.forEach((node) => addKeys(node));

    nodesToRemove.forEach((key) => {
      keysSet.forEach((obj) => {
        if (obj.id === key) {
          keysSet.delete(obj);
        }
      });
    });

    return Array.from(keysSet);
  };

  const query = useSearchParams();
  const [allCategories, setAllCategories] = useState<TreeDataNode[]>([]);
  const reduceIdNode = (selectedIds: string[]) => {
    const treeNodes: TreeDataNode[] = selectedIds.map((key) => {
      return { key, title: "", children: [] };
    });
    const newSelectedCategories = mergeCheckedKeys(treeNodes);
    const newSelectedCategoriesId = newSelectedCategories.map((c) => c.id);
    return newSelectedCategoriesId;
  };
  const [checkedKeys, setCheckedKeys] = useState<string[]>(
    reduceIdNode(props.selectedCategories)
  );

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue, info) => {
    const checkedNodes = info.checkedNodes;
    const newSelectedCategories = mergeCheckedKeys(checkedNodes);
    const newSelectedCategoriesId = newSelectedCategories.map((c) => c.id);
    setCheckedKeys(newSelectedCategoriesId as string[]);
    props.setSelectedCategories(checkedKeysValue as string[]);

    const categoryKeys: string[] = [];
    const subCategoryKeys: string[] = [];
    const subCategoryTypeKeys: string[] = [];

    newSelectedCategories.forEach((category) => {
      const level = getNodeLevel(category.id, allCategories);
      if (level === 1) {
        categoryKeys.push(category.id);
      } else if (level === 2) {
        subCategoryKeys.push(category.id);
      } else if (level === 3) {
        subCategoryTypeKeys.push(category.id);
      }
    });

    const updatedQuery = new URLSearchParams(query.toString());
    if (categoryKeys.length > 0) {
      updatedQuery.set("category", encodeURIComponent(categoryKeys.join(",")));
    } else {
      updatedQuery.delete("category");
    }
    if (subCategoryKeys.length > 0) {
      updatedQuery.set(
        "subCategory",
        encodeURIComponent(subCategoryKeys.join(","))
      );
    } else {
      updatedQuery.delete("subCategory");
    }
    if (subCategoryTypeKeys.length > 0) {
      updatedQuery.set(
        "subCategoryType",
        encodeURIComponent(subCategoryTypeKeys.join(","))
      );
    } else {
      updatedQuery.delete("subCategoryType");
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
    props.addFilter("category", newSelectedCategories);
  };

  useEffect(() => {
    const loadAllCategories = async () => {
      const data: _CategoryType[] = await CategoryService.getAllCategories();
      const categories = data.map((category) =>
        convertToTreeDataNode(category)
      );
      setAllCategories(categories);
    };

    loadAllCategories();
  }, []);

  useEffect(() => {
    setCheckedKeys(reduceIdNode(props.selectedCategories));
  }, [props.selectedCategories]);

  return (
    <Tree
      checkable
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={allCategories}
      blockNode
      className="bg-[#f3f3f3] text-xs"
    />
  );
}
