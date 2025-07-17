import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";

export const MainHeader = () => {
    console.log("MainHeader renderizado"); // Debug

    return (
        <div className="status-header">
            <div className="status-container">
                {/* Menu Hambúrguer com Sidebar */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="menu-icon">
                            <Menu size={24} color="#ffffff" />
                        </button>
                    </SheetTrigger>
                    <Sidebar />
                </Sheet>
                {/* Chama */}
                <div className="status-icon" style={{color: '#cccccc'}}>
                    <span>0</span>
                    <div>🔥</div>
                </div>
                
                {/* Diamante */}
                <div className="status-icon" style={{color: '#ffc107'}}>
                    <span>17</span>
                    <div>💎</div>
                </div>
                
                {/* Raio */}
                <div className="status-icon" style={{color: '#9c27b0'}}>
                    <span>5</span>
                    <div>⚡</div>
                </div>
            </div>
        </div>
    )
} 