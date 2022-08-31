import React, { useContext } from "react";
import { MainContext } from "../../MainContext";
import { Tree, TreeNode } from "react-organizational-chart";
import TreeCard from "./TreeCard";
import Employee from "./Employee";

function CustomTreeNode({ node }) {
  const { employees } = useContext(MainContext);

  return (
    <>
      {node.children.length > 0 ? (
        <TreeNode label={<TreeCard  node={node} />}>
          {node.children.map((empId, index) => {
            const currEmp = employees.filter((item) => item.empNum === empId);
            if (currEmp.length > 0)
              return (
                <CustomTreeNode key={index} node={new Employee(currEmp[0])} />
              );
          })}
        </TreeNode>
      ) : (
        <TreeNode label={<TreeCard node={node}/>} />
      )}
    </>
  );
}

export default CustomTreeNode;
