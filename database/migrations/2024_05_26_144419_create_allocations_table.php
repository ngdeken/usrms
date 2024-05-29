<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('allocations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('hostelID')->nullable();
            $table->foreign('hostelID')->references('hostelID')->on('hostels');
            $table->unsignedBigInteger('blockID')->nullable();
            $table->foreign('blockID')->references('blockID')->on('blocks');
            $table->unsignedBigInteger('roomID')->nullable();
            $table->foreign('roomID')->references('id')->on('rooms');
            $table->unsignedBigInteger('studentID')->nullable();
            $table->foreign('studentID')->references('studentID')->on('students');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allocations');
    }
};
