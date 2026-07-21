import { useAppSelector } from "@/lib/redux/hooks";
import { useContext } from "react";
import { AttributeContext } from "../context";
import { attributeSelectItemsSelector } from "../store";

const useAttribute = () => {
    const attributeCtx = useContext(AttributeContext);
    const { attributesSelect } = useAppSelector(state => state.attribute);
    const attributeSelectItems = useAppSelector(attributeSelectItemsSelector)

    return {
        attributesSelect,
        attributeSelectItems,
        ...attributeCtx,
    };
}

export default useAttribute