import React, { useContext } from "react";
import { MainContext } from "../../MainContext";
import { Tree, TreeNode } from "react-organizational-chart";

function CustomTreeNode({ node }) {
  const { employees } = useContext(MainContext);

  return (
    <>
      {node.children.length > 0 ? (
        <TreeNode label={<div>{node.firstName}</div>}>
          {node.children.map((empId,index) => {
            const currEmp = employees.filter((item) => item.empNum === empId);
            if (currEmp.length > 0)
              return (
                <CustomTreeNode
                key={index}
                  node={
                    new employee(
                      currEmp[0].firstName,
                      currEmp[0].children,
                      currEmp[0].empNum
                    )
                  }
                />
              );
          })}
        </TreeNode>
      ) : (
        <TreeNode label={<div>{node.firstName}</div>} />
      )}
    </>
  );
}

class employee {
  constructor(firstName, children, empNum) {
    this.firstName = firstName;
    this.children = children;
    this.empNum = empNum;
  }

  display() {
    return <TreeNode label={<div>{this.firstName}</div>} />;
  }
}

export default CustomTreeNode;
